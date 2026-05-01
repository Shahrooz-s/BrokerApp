# Cloudflare DNS and SSL Guide

## Target Hostname

Use this public URL for the first BrokerApp deployment:

```text
https://app.lendaloan.com.au
```

The Twenty environment should use:

```env
SERVER_URL=https://app.lendaloan.com.au
```

## Key Cloudflare Finding

Cloudflare proxied DNS supports normal HTTP/HTTPS web traffic on specific ports. Port `3000` is not one of the standard proxied HTTPS ports.

For this project, do not expect this to work through an orange-cloud proxied DNS record:

```text
https://app.lendaloan.com.au:3000
```

Instead, use one of these patterns:

- Recommended: Cloudflare DNS -> reverse proxy on `443` -> Twenty container on `3000`.
- Alternative: Cloudflare Tunnel -> `http://localhost:3000` on the Dockge host.

## Recommended DNS Record

In Cloudflare DNS for `lendaloan.com.au`, create:

```text
Type: A
Name: app
Content: <your Dockge server public IPv4>
Proxy status: Proxied
TTL: Auto
```

If the server has IPv6, optionally add:

```text
Type: AAAA
Name: app
Content: <your Dockge server public IPv6>
Proxy status: Proxied
TTL: Auto
```

Only proxy records used for web traffic. Keep mail records and verification records DNS-only unless a vendor specifically supports Cloudflare proxying.

## SSL/TLS Mode

Set Cloudflare:

```text
SSL/TLS -> Overview -> Full (strict)
```

Use `Full (strict)` only when the origin/reverse proxy has a valid certificate. Good options:

- Caddy with Let's Encrypt.
- Nginx Proxy Manager with Let's Encrypt.
- Traefik with Let's Encrypt.
- Cloudflare Origin Certificate installed on the reverse proxy, while the DNS record remains proxied.

Avoid `Flexible` mode. It encrypts browser-to-Cloudflare traffic but not Cloudflare-to-origin traffic, which is not appropriate for a CRM handling client information.

## Reverse Proxy Pattern

Keep the Docker Compose service listening internally on `3000`:

```yaml
ports:
  - "3000:3000"
```

Then configure the reverse proxy:

```text
app.lendaloan.com.au -> http://127.0.0.1:3000
```

Public users should visit:

```text
https://app.lendaloan.com.au
```

not:

```text
http://server-ip:3000
```

## Cloudflare Tunnel Alternative

If you do not want to open ports `80` and `443` on the server, use Cloudflare Tunnel.

Tunnel route:

```text
app.lendaloan.com.au -> http://localhost:3000
```

This removes the need to expose the Dockge host directly, but it adds Cloudflare Tunnel as another service to run and monitor.

## Minimum Cloudflare Settings

- DNS `app` record is Proxied.
- SSL/TLS mode is `Full (strict)` after an origin certificate is installed.
- Always Use HTTPS is enabled.
- Do not cache CRM application pages aggressively.
- Keep WebSockets enabled if using real-time app features.
- Restrict direct origin access where possible after the reverse proxy/tunnel is working.

## Origin Server Firewall

Cloudflare recommends configuring the origin server so proxied web traffic reaches the server only from Cloudflare IP addresses. This matters because if someone discovers the server IP, they could otherwise bypass Cloudflare and hit the origin directly.

After the reverse proxy is working:

1. Allow Cloudflare IP ranges to reach ports `80` and `443`.
2. Allow trusted administrator IPs for SSH/Dockge access.
3. Block other direct inbound traffic to ports `80` and `443`.
4. Do not expose Postgres, Redis, or the internal Twenty container port publicly.

Cloudflare publishes the current IP ranges here:

```text
https://www.cloudflare.com/ips/
```

Cloudflare's example pattern is:

```bash
# For each Cloudflare IPv4 range:
iptables -I INPUT -p tcp -m multiport --dports http,https -s <cloudflare-ip-range> -j ACCEPT

# For each Cloudflare IPv6 range:
ip6tables -I INPUT -p tcp -m multiport --dports http,https -s <cloudflare-ipv6-range> -j ACCEPT
```

Then, after trusted sources are allowed, block other direct HTTP/HTTPS traffic:

```bash
iptables -A INPUT -p tcp -m multiport --dports http,https -j DROP
ip6tables -A INPUT -p tcp -m multiport --dports http,https -j DROP
```

Only apply firewall rules from a server console or a session you can recover from. Keep SSH access allowed before adding any drop rules.

## Deployment Order

1. Deploy `brokerapp-v1` in Dockge.
2. Confirm the app is reachable from the server on `http://localhost:3000`.
3. Configure reverse proxy or Cloudflare Tunnel.
4. Add the Cloudflare DNS record for `app.lendaloan.com.au`.
5. Set `SERVER_URL=https://app.lendaloan.com.au`.
6. Restart the Dockge stack.
7. Test `https://app.lendaloan.com.au/healthz`.
8. Test normal browser login/signup.

## References

- Cloudflare proxied DNS records: https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/
- Cloudflare subdomain records and SSL/TLS: https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/
- Cloudflare network ports: https://developers.cloudflare.com/fundamentals/reference/network-ports/
- Cloudflare IP addresses and origin firewall guidance: https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/
- Cloudflare Tunnel routing: https://developers.cloudflare.com/tunnel/routing/

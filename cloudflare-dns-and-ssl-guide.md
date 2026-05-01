# Cloudflare DNS and SSL Guide

## Target Hostname

Use this public URL for the first BrokerApp deployment:

```text
https://app.lendaloan.com.au
```

The main/root website remains separate:

```text
lendaloan.com.au -> CyberPanel instance on Vultr
www.lendaloan.com.au -> CyberPanel instance on Vultr
app.lendaloan.com.au -> Dockge/BrokerApp through Cloudflare Tunnel
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

- Current plan: Cloudflare Tunnel -> `http://localhost:3000` on the Dockge host.
- Alternative later: Cloudflare DNS -> reverse proxy on `443` -> Twenty container on `3000`.

## DNS Records

Keep the existing root-domain DNS records pointed to the CyberPanel/Vultr server:

```text
Type: A
Name: @
Content: <CyberPanel/Vultr public IPv4>
Proxy status: Proxied
TTL: Auto
```

For `www`, use either an A record to the CyberPanel/Vultr IP or a CNAME to the root, depending on the existing CyberPanel setup.

For the app, use Cloudflare Tunnel routing rather than an A record to Dockge:

```text
Hostname: app.lendaloan.com.au
Service: http://localhost:3000
Target host: Dockge server running brokerapp-v1
```

Cloudflare Tunnel will create/manage the proxied DNS route for `app.lendaloan.com.au`.

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

## Cloudflare Tunnel Pattern

This is the current plan for BrokerApp.

Run `brokerapp-v1` on the Dockge host with Twenty listening on local port `3000`, then route Cloudflare Tunnel to:

```text
http://localhost:3000
```

Public users should visit:

```text
https://app.lendaloan.com.au
```

Set the Dockge `.env` value:

```env
SERVER_URL=https://app.lendaloan.com.au
```

The root domain should not route to BrokerApp:

```text
https://lendaloan.com.au -> CyberPanel/Vultr
https://www.lendaloan.com.au -> CyberPanel/Vultr
https://app.lendaloan.com.au -> Dockge/BrokerApp
```

## Reverse Proxy Pattern

If you later stop using Cloudflare Tunnel, keep the Docker Compose service listening internally on `3000`:

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

## Minimum Cloudflare Settings

- Root and `www` records continue pointing to CyberPanel/Vultr.
- `app.lendaloan.com.au` is routed through Cloudflare Tunnel to the Dockge host.
- SSL/TLS mode is `Full (strict)` for normal proxied origins after origin certificates are installed. Cloudflare Tunnel does not require opening public `80/443` on the Dockge host.
- Always Use HTTPS is enabled.
- Do not cache CRM application pages aggressively.
- Keep WebSockets enabled if using real-time app features.
- Restrict direct origin access where possible after the reverse proxy/tunnel is working.

## Origin Server Firewall

Cloudflare recommends configuring the origin server so proxied web traffic reaches the server only from Cloudflare IP addresses. This matters because if someone discovers the server IP, they could otherwise bypass Cloudflare and hit the origin directly.

For the CyberPanel/Vultr origin, after the proxied website is working:

1. Allow Cloudflare IP ranges to reach ports `80` and `443`.
2. Allow trusted administrator IPs for SSH/Dockge access.
3. Block other direct inbound traffic to ports `80` and `443`.
4. Do not expose Postgres, Redis, or the internal Twenty container port publicly.

For the Dockge/BrokerApp host using Cloudflare Tunnel:

- Do not expose public port `3000`.
- Keep Postgres and Redis internal to Docker.
- Restrict Dockge admin access to trusted IPs or a private/VPN/Zero Trust route where possible.
- Keep `cloudflared` running and monitored on the Dockge host.

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

1. Keep root and `www` DNS records pointed to the CyberPanel/Vultr website.
2. Deploy `brokerapp-v1` in Dockge.
3. Confirm the app is reachable from the Dockge host on `http://localhost:3000`.
4. Create a Cloudflare Tunnel route for `app.lendaloan.com.au -> http://localhost:3000`.
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

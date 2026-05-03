import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { useLocation } from 'react-router-dom';
import { AppPath } from 'twenty-shared/types';
import {
  IconBuildingSkyscraper,
  IconFileCheck,
  IconLayoutDashboard,
  IconListCheck,
  IconTargetArrow,
} from 'twenty-ui/display';

export const NavigationDrawerLoanOnboardingSection = () => {
  const { hash, pathname } = useLocation();
  const { toggleNavigationSection, isNavigationSectionOpen } =
    useNavigationSection('Loan Onboarding');

  return (
    <NavigationDrawerSection>
      <NavigationDrawerSectionTitle
        label="Loan Onboarding"
        isOpen={isNavigationSectionOpen}
        onClick={toggleNavigationSection}
      />
      {isNavigationSectionOpen && (
        <>
          <NavigationDrawerItem
            label="LoanDash"
            to={AppPath.LoanDash}
            Icon={IconLayoutDashboard}
            active={pathname === AppPath.LoanDash && hash === ''}
            preventCollapseOnMobile
          />
          <NavigationDrawerItem
            label="Goals"
            to={`${AppPath.LoanDash}#goals`}
            Icon={IconTargetArrow}
            active={pathname === AppPath.LoanDash && hash === '#goals'}
            preventCollapseOnMobile
          />
          <NavigationDrawerItem
            label="Serviceability"
            to={`${AppPath.LoanDash}#serviceability`}
            Icon={IconBuildingSkyscraper}
            active={pathname === AppPath.LoanDash && hash === '#serviceability'}
            preventCollapseOnMobile
          />
          <NavigationDrawerItem
            label="Credit Checks"
            to={`${AppPath.LoanDash}#credit-checks`}
            Icon={IconFileCheck}
            active={pathname === AppPath.LoanDash && hash === '#credit-checks'}
            preventCollapseOnMobile
          />
          <NavigationDrawerItem
            label="Tasks"
            to={`${AppPath.LoanDash}#tasks`}
            Icon={IconListCheck}
            active={pathname === AppPath.LoanDash && hash === '#tasks'}
            preventCollapseOnMobile
          />
        </>
      )}
    </NavigationDrawerSection>
  );
};

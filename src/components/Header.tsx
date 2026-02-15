import Branding from './Branding';
import CarouselNav from './CarouselNav';

export interface NavItem {
  title: string;
  id: string;
  to: string;
}

export default function Header({
  isNavHidden,
  navItems,
  onClickBranding,
}: {
  isNavHidden: boolean;
  navItems: NavItem[];
  onClickBranding: Function;
}) {
  return (
    <div className="fixed flex z-300 ">
      <div
        onClick={() => {
          onClickBranding();
        }}
      >
        <Branding />
      </div>
      <CarouselNav items={navItems} hidden={isNavHidden} />
    </div>
  );
}

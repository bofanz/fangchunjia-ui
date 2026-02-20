import Branding from './Branding';
import CarouselNav from './CarouselNav';

export interface NavItem {
  title: string;
  id: string;
  to: string;
}

export default function Header({
  navItems,
  onClickBranding,
}: {
  navItems: NavItem[];
  onClickBranding: Function;
}) {
  return (
    <div className="fixed z-300 hidden sm:flex">
      <div
        onClick={() => {
          onClickBranding();
        }}
      >
        <Branding />
      </div>
      <CarouselNav items={navItems} />
    </div>
  );
}

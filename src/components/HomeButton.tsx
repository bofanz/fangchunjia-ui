import { Link } from '@tanstack/react-router';

export default function HomeButton() {
  return (
    <div className="fixed top-[64px] right-[64px] z-1000">
      <Link
        to={'/home'}
        className="home-button font-bold text-2xl cursor-pointer text-fangchunjia-pink hover:text-white"
      ></Link>
    </div>
  );
}

import { Link } from '@tanstack/react-router';
import ToStartGraphic from './graphics/ToStartGraphic';

export default function ToStart() {
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex">
        <Link
          to="/home"
          className="m-auto *:fill-fangchunjia-green hover:*:fill-white *:transition"
        >
          <ToStartGraphic />
        </Link>
      </div>
    </>
  );
}

import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

export default function StartButton() {
  return (
    <>
      <header className="fixed w-full top-0">
        <nav className="flex justify-end">
          <div className="">
            <Link to="/home" className="">
              <motion.div
                whileHover={{
                  color: '#FFFFFF',
                  transition: { duration: 0.1 },
                }}
                className="font-bold text-2xl w-fit h-fit p-12 sm:p-20 text-black text-3xl"
              >
                To Start
              </motion.div>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

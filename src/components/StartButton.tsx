import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

export default function StartButton() {
  return (
    <>
      <header className="fixed top-0 right-0">
        <nav className="flex justify-end font-bold text-2xl">
          <div className="px-8 pt-16">
            <Link to="/home" className="">
              <motion.div
                whileHover={{
                  color: '#FFFFFF',
                  transition: { duration: 0.1 },
                }}
                className="w-fit h-fit p-20 pb-12 text-black text-3xl"
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

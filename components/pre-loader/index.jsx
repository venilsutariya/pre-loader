'use client';
import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';
import NumberTicker from '@/components/number-ticker';

export default function Index() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const words = ["Hello", "Holla", "Namaste", "Bonjour"];

    useEffect(() => {
        if (typeof window !== undefined) {
            setDimension({ width: window.innerWidth, height: window.innerHeight })
        }
    }, []);

    useEffect(() => {
        if (index == words.length - 1) return;
        setTimeout(() => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className={`${styles.introduction}`}>
            {dimension.width > 0 &&
                <>
                    <motion.p className={`text-xl tracking-tight lg:text-4xl`} variants={opacity} initial="initial" animate="enter">
                        {words[index]}
                    </motion.p>
                    <motion.div
                        initial={{ bottom: 10, right: 10 }}
                        animate={{ top: 10, right: 10 }}
                        transition={{ duration: 2 }}
                        className='absolute'
                    >
                        <div className='flex items-center'>
                            <NumberTicker value={"101"} />
                            <div className='text-white text-4xl'>%</div>
                        </div>
                    </motion.div>
                </>
            }
        </motion.div>
    );
};
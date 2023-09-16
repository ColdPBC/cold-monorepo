import { ButtonTypes } from '@coldpbc/enums';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BaseButton } from '../../atoms';
import { XMarkIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

const closeBtnVariants = {
    hidden: { opacity: 0, right: '-12px' },
    show: {
      opacity: 1,
      right: '12px',
      transition: {
        delay: .1
      }
    }
  }

export const GuidanceButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className={clsx(
                "fixed text-white font-bold text-sm leading-normal bottom-[16px] right-[16px] bg-bgc-elevated p-3 rounded-2xl flex items-center flex-col border overflow-clip hover:border-primary",
                {
                    "border-primary": isOpen,
                    "border-bgc-accent cursor-pointer hover:bg-bgc-accent": !isOpen
                }
            )}
            initial={false}
            animate={{
                width: isOpen ? '400px' : '168px',
                height: isOpen ? '93px' : '48px',

            }}
            onClick={() => setIsOpen(true)}
        >   

            <div className='flex justify-between w-full relative'>
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none" className="mr-2">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6053 4.74358L19.9196 0H16.8793L14.5333 3.35793C14.533 3.35793 14.5327 3.35763 14.5327 3.35763L12.9591 5.60991C12.9594 5.60991 12.9594 5.60991 12.9597 5.60991L4.98646 17.0215C3.6464 15.7465 2.81177 13.9675 2.81177 12.0006C2.81177 8.13232 6.03626 4.98529 10 4.98529C10.1171 4.98529 10.2336 4.98828 10.3492 4.99367L12.0886 2.50416C11.4146 2.36326 10.7164 2.28728 10 2.28728C4.51198 2.28728 0.0473633 6.64466 0.0473633 12.0006C0.0473633 14.8928 1.35126 17.492 3.41345 19.2729L0.110811 24H3.15047L11.6374 11.8528H11.638L15.0311 6.99646C16.361 8.27053 17.188 10.0427 17.188 12.0006C17.188 15.8692 13.9635 19.0162 10 19.0162C9.89215 19.0162 9.78518 19.0129 9.67851 19.0081L7.93631 21.5015C8.60236 21.6391 9.29231 21.7127 10 21.7127C15.4878 21.7127 19.9524 17.3559 19.9524 12.0006C19.9524 9.11682 18.6568 6.52411 16.6053 4.74358Z" fill="white"/>
                    </svg>
                    Need Guidance?
                </div>
            </div>
                <motion.div
                    initial={false}
                    animate={{
                        y: isOpen ? '0px' : '100%',
                    }}
                    transition={{
                        delay: !isOpen ? 0 : .3
                    }}
                    className='flex w-full mt-2'
                >
                    <span className='flex-1 mr-2'>
                        <BaseButton
                            label={'Get in touch'}
                            variant={ButtonTypes.secondary}
                            href='mailto:support@coldclimate.com'
                        />
                    </span>
                    <span className='flex-1'>
                        <BaseButton
                            label={'Schedule A Call'}
                            variant={ButtonTypes.secondary}
                            href='https://www.getclockwise.com/c/stuart-johnson-coldclimate-com/cold-climate-expert-discussion'
                            target={'_blank'}
                        />
                    </span>
                </motion.div>
                <div className='absolute w-[400px]'>
                    {isOpen &&
                        <motion.button
                            className='w-[20px] h-[20px] absolute'
                            initial="hidden"
                            animate="show"
                            variants={closeBtnVariants}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                        >
                            <XMarkIcon />
                        </motion.button>
                    }
                </div>
        </motion.div>
    )
}
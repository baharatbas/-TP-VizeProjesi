import React from 'react';
import { motion } from 'framer-motion';
import './RobotModel.css';

const RobotModel = ({ isTalking = false, size = 'large' }) => {
  return (
    <motion.div 
      className={`robot-model robot-${size}`}
      animate={isTalking ? {
        y: [0, -5, 0],
        rotate: [0, 2, -2, 0]
      } : {
        y: 0,
        rotate: 0
      }}
      transition={{
        duration: 1.5,
        repeat: isTalking ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      {/* Robot Head */}
      <div className="robot-head">
        <div className="robot-face">
          {/* Eyes */}
          <div className="robot-eyes">
            <motion.div 
              className="robot-eye left-eye"
              animate={isTalking ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              } : {}}
              transition={{
                duration: 0.5,
                repeat: isTalking ? Infinity : 0,
                delay: 0.2
              }}
            />
            <motion.div 
              className="robot-eye right-eye"
              animate={isTalking ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              } : {}}
              transition={{
                duration: 0.5,
                repeat: isTalking ? Infinity : 0,
                delay: 0.4
              }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className="robot-mouth"
            animate={isTalking ? {
              height: ['4px', '8px', '4px'],
              width: ['20px', '24px', '20px']
            } : {
              height: '4px',
              width: '20px'
            }}
            transition={{
              duration: 0.3,
              repeat: isTalking ? Infinity : 0
            }}
          />
        </div>
        
        {/* Antenna */}
        <div className="robot-antenna">
          <motion.div 
            className="antenna-top"
            animate={isTalking ? {
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6]
            } : {}}
            transition={{
              duration: 1,
              repeat: isTalking ? Infinity : 0
            }}
          />
        </div>
      </div>
      
      {/* Robot Body */}
      <div className="robot-body">
        <div className="robot-chest">
          <div className="chest-panel"></div>
          <div className="chest-panel"></div>
          <div className="chest-panel"></div>
        </div>
      </div>
      
      {/* Robot Arms */}
      <div className="robot-arms">
        <motion.div 
          className="robot-arm left-arm"
          animate={isTalking ? {
            rotate: [0, 10, -10, 0]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isTalking ? Infinity : 0,
            delay: 0.3
          }}
        />
        <motion.div 
          className="robot-arm right-arm"
          animate={isTalking ? {
            rotate: [0, -10, 10, 0]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isTalking ? Infinity : 0,
            delay: 0.5
          }}
        />
      </div>
      
      {/* Glow Effect */}
      {isTalking && (
        <motion.div 
          className="robot-glow"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default RobotModel;



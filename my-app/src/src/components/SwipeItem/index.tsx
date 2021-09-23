import { useState } from "react";
import { FC } from "react";

interface Props {
    onSwipeRTL: () => void;
    onSwipeLTR: () => void;
}

const SwipeItem: FC<Props> = (props) => {
    const { onSwipeRTL, onSwipeLTR } = props;
    const [ left, setLeft ] = useState<number>(0);
    const [ right, setRight ] = useState<number>(0);
    const [ originalOffset, setOiginalOffset ] = useState<number>(0);
    const [ velocity, setVelocity ] = useState<number>(0);
    const [ timeOfLastDragEvent, setTimeOfLastDragEvent ] = useState<number>(0);
    const [ touchStartX, setTouchStartX ] = useState<number>(0);
    const [ prevTouchX, setPrevTouchX ] = useState<number>(0);
    const [ beingTouched, setBeingTouched ] = useState<boolean>(false);
    const [ intervalId, setIntervalId ] = useState<number>();
    
    const animateSlidingToZero = () => {
      let newVelocity, newLeft, newRight;
      if (!beingTouched && left < -0.01) {
        newVelocity = velocity + 10 * 0.033;
        newLeft = left + newVelocity;
        if (left < -350) {
          window.clearInterval(intervalId);
          handleSwipeRTL();
        }
        setLeft(newLeft);
        setVelocity(newVelocity);
      } else if (!beingTouched) {
        newLeft = 0;
        newVelocity = 0;
        window.clearInterval(intervalId);
        setLeft(newLeft);
        setVelocity(newVelocity);
      }

      if (!beingTouched && right < -0.01) {
        newVelocity = velocity + 10 * 0.033;
        newRight = right + newVelocity;
        if (right < -350) {
          window.clearInterval(intervalId);
          handleSwipeLTR();
        }
        setLeft(newRight);
        setVelocity(newVelocity);
      } else if (!beingTouched) {
        newRight = 0;
        newVelocity = 0;
        window.clearInterval(intervalId);
        setLeft(newRight);
        setVelocity(newVelocity);
      }
    }
    
    const handleSwipeRTL = () => {
      window.setTimeout(() => onSwipeRTL(), 250);
    }

    const handleSwipeLTR = () => {
        window.setTimeout(() => onSwipeLTR(), 250);
      }
    
    const handleStart = (clientX: any) => {
      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
      setOiginalOffset(left);
      setVelocity(0);
      setTimeOfLastDragEvent(Date.now());
      setTouchStartX(clientX);
      setBeingTouched(true);
    }
    
    const handleMove = (clientX: any) => {
      if (beingTouched) {
        const touchX = clientX;
        const currTime = Date.now();
        const elapsed = currTime - timeOfLastDragEvent;
        const velocity = 20 * (touchX - prevTouchX) / elapsed;
        let deltaX = touchX - touchStartX + originalOffset;
        if (deltaX < -350) {
            handleSwipeRTL();
        } else if (deltaX > 0) {
            handleSwipeLTR();
        }
        setLeft(deltaX);
        setRight(deltaX);
        setVelocity(velocity);
        setTimeOfLastDragEvent(currTime);
        setPrevTouchX(touchX);
      }
    }
    
    const handleEnd = () => {
        setVelocity(velocity);
        setTouchStartX(0);
        setBeingTouched(false);
        setIntervalId(window.setInterval(animateSlidingToZero.bind(this), 33));
    }
    
    const handleTouchStart = (touchStartEvent: any) => {
      touchStartEvent.preventDefault();
      handleStart(touchStartEvent.targetTouches[0].clientX);
    }
    
    const handleTouchMove = (touchMoveEvent: any) => {
      handleMove(touchMoveEvent.targetTouches[0].clientX);
    }
    
    const handleTouchEnd = () => {
      handleEnd();
    }
    
    const handleMouseDown = (mouseDownEvent: any) => {
      mouseDownEvent.preventDefault();
      handleStart(mouseDownEvent.clientX);
    }
    
    const handleMouseMove = (mouseMoveEvent: any) => {
      handleMove(mouseMoveEvent.clientX);
    }
    
    const handleMouseUp = () => {
      handleEnd();
    }
    
    const handleMouseLeave = () => {
      handleMouseUp();
    }
    
    return (
    <li
        className="swipeItem"
        style={{transition: 'height 250ms ease-in-out'}}
        onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
        onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => handleTouchEnd()}
        // The following event handlers are for mouse compatibility:
        onMouseDown={mouseDownEvent => handleMouseDown(mouseDownEvent)}
        onMouseMove={mouseMoveEvent => handleMouseMove(mouseMoveEvent)}
        onMouseUp={() => handleMouseUp()}
        onMouseLeave={() => handleMouseLeave()}
    >
        <div
        className="swipeItem-content"
        style={{left: left + 'px',right: right + 'px'}}
        >
        {props.children}
        </div>
    </li>
    );
}

export default SwipeItem;
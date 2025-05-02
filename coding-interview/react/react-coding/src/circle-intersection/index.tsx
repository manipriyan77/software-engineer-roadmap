import { useEffect } from 'react';
const CircleIntersection = () => {
  function hanldeContext(e) {
    e.preventDefault();
  }
  function handleMouseDown(e) {
    console.log('e :>> ', e);
  }
  useEffect(() => {
    console.log('object');
    document.addEventListener('contextmenu', hanldeContext);

    return () => {
      document.removeEventListener('contextmenu', hanldeContext);
    };
  }, []);
  return <div onMouseDown={handleMouseDown}>CircleIntersection</div>;
};

export default CircleIntersection;

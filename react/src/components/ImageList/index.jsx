import React from "react";
import ImageShow from "../ImageShow";

const ImageList = ({ data }) => {
  return (
    <div>
      {data?.map((image) => (
        <ImageShow image={image} key={image.id} />
      ))}
    </div>
  );
};

export default ImageList;

import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

const ProductGallery = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = product.images?.map((src) => ({ src }));

  return (
    <div>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-[400px] rounded-xl object-contain border cursor-zoom-in"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        loading="lazy"
      />

      <div className="mt-4 grid grid-cols-4 gap-2">
        {product.images?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.title} ${i + 1}`}
            className="h-20 object-cover rounded border cursor-pointer"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            loading="lazy"
          />
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images}
          index={index}
          plugins={[Thumbnails]}
        />
      )}
    </div>
  );
};

export default ProductGallery;

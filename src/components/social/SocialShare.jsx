import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa';
import * as Tooltip from '@radix-ui/react-tooltip';

const SocialShare = ({ product }) => {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const message = `Check out ${product.title} on our website!`;

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const renderTooltip = (label, children, key = '') => (
    <Tooltip.Root key={key}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          align="center"
          sideOffset={5}
          className="text-sm px-3 py-1 rounded shadow-md animate-fade-in"
          style={{
            backgroundColor: '#465542', 
            color: '#F5F2F4', 
          }}
        >
          {label}
          <Tooltip.Arrow className="fill-current" style={{ color: '#465542' }} />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-3" style={{ color: '#465542' }}>
        Share this product
      </h3>
      <Tooltip.Provider delayDuration={200}>
        <div className="flex gap-3 flex-wrap items-center">
{renderTooltip(
  'Share on Facebook',
  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-colors duration-200"
    style={{
      backgroundColor: '#1877F2',
      color: '#F5F2F4',
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C2B823')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1877F2')}
  >
    <FaFacebookF className="w-5 h-5" />
  </a>,
  'facebook' 
)}

{renderTooltip(
  'Share on Twitter',
  <a
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}&url=${encodeURIComponent(shareUrl)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-colors duration-200"
    style={{
      backgroundColor: '#1DA1F2',
      color: '#F5F2F4',
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C2B823')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1DA1F2')}
  >
    <FaTwitter className="w-5 h-5" />
  </a>,
  'twitter' 
)}

{renderTooltip(
  'Share on WhatsApp',
  <a
    href={`https://wa.me/?text=${encodeURIComponent(`${message} ${shareUrl}`)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 rounded-full transition-colors duration-200"
    style={{
      backgroundColor: '#25D366',
      color: '#F5F2F4',
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C2B823')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#25D366')}
  >
    <FaWhatsapp className="w-5 h-5" />
  </a>,
  'whatsapp'
)}

{renderTooltip(
  copied ? 'Copied!' : 'Copy link',
  <button
    onClick={handleCopyLink}
    className="p-2 rounded-full transition-colors duration-200"
    style={{
      backgroundColor: '#A5A1A4',
      color: '#465542',
    }}
    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#C2B823')}
    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#A5A1A4')}
  >
    <FaLink className="w-5 h-5" />
  </button>,
  'copylink' 
)}

        </div>
      </Tooltip.Provider>
    </div>
  );
};

export default SocialShare;

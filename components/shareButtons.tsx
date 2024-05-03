import React from 'react';

const ShareButtons: React.FC = () => {
  const shareLinkedIn = (): void => {
    const url: string = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}`, '_blank');
  };

  const shareTwitter = (): void => {
    const url: string = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
  };

  const shareFacebook = (): void => {
    const url: string = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert("URL copied to clipboard!"))
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div id="share-buttons">
      <button onClick={shareLinkedIn}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3c43d1e5501c48e2896654e6368e313f%2F40ce87cccdd648f3960c260558bb2e7b"
          alt="LinkedIn Share"
          width="30"
        />
      </button>
      <button onClick={shareTwitter}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3c43d1e5501c48e2896654e6368e313f%2Fafa6115fc1ac43608b8a238a06ee3661"
          alt="Twitter Share"
          width="30"
        />
      </button>
      <button onClick={shareFacebook}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3c43d1e5501c48e2896654e6368e313f%2F52357f2c132e42198723bc6c53012c93"
          alt="Facebook Share"
          width="30"
        />
      </button>
      <button onClick={copyToClipboard}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2F3c43d1e5501c48e2896654e6368e313f%2Fefebff8b443c489c9971680f37e36bcd"
          alt="Copy URL"
          width="30"
        />
      </button>
    </div>
  );
};

export default ShareButtons;

import styles from './index.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={styles['footer-wrapper']}>
      <div className={styles['footer-content']}>
        <div className={styles['left']}>
          <svg
            className={styles['logo']}
            width="103"
            height="30"
            viewBox="0 0 103 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0028 6.81784C10.5098 6.81784 6.86749 10.4338 6.86749 14.8944C6.86749 19.3549 10.5098 22.9709 15.0028 22.9709C19.4958 22.9709 23.1381 19.3549 23.1381 14.8944C23.1381 10.4338 19.4958 6.81784 15.0028 6.81784ZM0 14.8944C0 6.66843 6.71699 0 15.0028 0C23.2886 0 30.0056 6.66843 30.0056 14.8944C30.0056 23.1203 23.2886 29.7887 15.0028 29.7887C6.71699 29.7887 0 23.1203 0 14.8944Z"
              fill="#f1b4bb"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M50.3968 6.81784C45.9354 6.81784 42.3188 10.4338 42.3188 14.8944C42.3188 19.3549 45.9354 22.9709 50.3968 22.9709C54.8582 22.9709 58.4748 19.3549 58.4748 14.8944C58.4748 10.4338 54.8582 6.81784 50.3968 6.81784ZM35.4996 14.8944C35.4996 6.66843 42.1693 0 50.3968 0C58.6243 0 65.294 6.66843 65.294 14.8944C65.294 23.1203 58.6243 29.7887 50.3968 29.7887C42.1693 29.7887 35.4996 23.1203 35.4996 14.8944Z"
              fill="#f1b4bb"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M80.5857 17.5166L70.9993 14.4482L73.2747 7.43875L82.8914 10.5168V0.422546H90.3081V10.4873L99.9582 7.33985L102.273 14.3367L92.6002 17.4915L98.6016 25.6592L92.6101 30L86.6021 21.8235L80.6441 29.9451L74.6492 25.6089L80.5857 17.5166Z"
              fill="#f1b4bb"
            />
          </svg>
        </div>
        <div className={styles['right']}>
          {year} © Paul LIU All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

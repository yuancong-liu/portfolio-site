'use client';

type Props = {
  headings: any;
};

export const PostToc = ({ headings }: Props) => {
  console.log('headings', headings);

  // const [tocOpen, setTocOpen] = useState(false);

  // return (
  //   <>
  //     <div className={styles['toc-back-wrapper']}>
  //       <button
  //         className={classNames(
  //           styles['toc-button'],
  //           tocOpen && styles['-open'],
  //         )}
  //       >
  //         On this page
  //       </button>
  //     </div>
  //     <nav className={classNames(className, styles['toc-nav'])} {...restProps} />
  //   </>
  // );
  return <div>{headings.toString()}</div>;
};

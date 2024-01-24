import { RefObject, useEffect, useState } from 'react';

type Heading = {
  id: string | null;
  text: string | null;
  children: Heading[] | null;
};

type ReturnType = {
  headings: Heading[];
  loading: boolean;
};

/**
 * To extract headings from the post content (h2 and h3)
 */
export const usePostHeadingsExtraction = (
  /**
   * Processed HTML (div element)
   */
  contentRef: RefObject<HTMLDivElement>,
): ReturnType => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!contentRef.current) return;
    const extraction = Array.from(
      contentRef.current.querySelectorAll('h2'),
    ).map((heading) => {
      const id = heading.getAttribute('id');
      const text = heading.textContent;
      const children = Array.from(
        heading.parentElement?.querySelectorAll('h3') ?? [],
      ).map((child) => {
        const id = child.getAttribute('id');
        const text = child.textContent;
        return { id, text, children: [] };
      });
      return { id, text, children };
    });
    setHeadings(extraction);
    setLoading(false);
  }, [setHeadings, contentRef]);

  return { headings, loading };
};

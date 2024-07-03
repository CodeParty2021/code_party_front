import { useCallback, useRef } from "react";

export type LogPanelRef = {
  scrollTo: (id: string) => void;
};

export const useLogPanel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback<LogPanelRef["scrollTo"]>(
    (id) => {
      const scrollElem = scrollRef.current;
      const targetElem = document.getElementById(id);

      if (!scrollElem || !targetElem) return;

      // ターゲット要素が上下中央に位置するようなスクロールトップを計算
      const targetRect = targetElem.getBoundingClientRect();
      const targetTop = targetRect.top + scrollElem.scrollTop;
      const targetMiddleInScrollElem = targetTop + targetRect.height / 2;
      const nextScrollTop =
        targetMiddleInScrollElem - scrollElem.clientHeight / 2;

      // スクロールエンドを計算
      const minScrollTop = 0;
      const maxScrollTop = scrollElem.scrollHeight - scrollElem.clientHeight;

      // スクロール可動域内でスクロールを実行
      if (nextScrollTop < minScrollTop)
        scrollElem.scrollTo({ top: minScrollTop, behavior: "auto" });
      else if (nextScrollTop > maxScrollTop)
        scrollElem.scrollTo({ top: maxScrollTop, behavior: "auto" });
      else scrollElem.scrollTo({ top: nextScrollTop, behavior: "auto" });
    },
    [scrollRef]
  );

  return {
    scrollRef,
    scrollTo,
  };
};

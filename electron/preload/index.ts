const safeDOM = {
  /** Safely append a child to a parent */
  append(parent: HTMLElement, child: HTMLElement) {
    if(!Array.from(parent.children).find((e) => e === child))
      return parent.appendChild(child);
  },
  /** Safely remove a child from a parent */
  remove(parent: HTMLElement, child: HTMLElement) {
    if(Array.from(parent.children).find((e) => e === child))
      return parent.removeChild(child);
  },
};

void [safeDOM];

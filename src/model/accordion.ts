
// AccordionTypes.ts
export interface AccordionItemType {
  title: string;
  content: (React.ReactNode | string)[];
}

export interface AccordionItemProps extends AccordionItemType {
  key?: number;
}
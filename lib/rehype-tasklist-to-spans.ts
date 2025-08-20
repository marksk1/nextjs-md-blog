import { visit } from 'unist-util-visit';

// Rehype plugin: convert GFM task list checkboxes (<input type="checkbox">)
// into custom <span> elements and add a class to the parent <li>.
export default function rehypeTasklistToSpans() {
  return function transformer(tree: any) {
    visit(tree, 'element', (node: any, _index?: number, parent?: any) => {
      // Add class to <li> elements that are task list items
      if (node.tagName === 'li') {
        const classList: string[] = Array.isArray(node.properties?.className)
          ? (node.properties.className as string[])
          : typeof node.properties?.className === 'string'
          ? (node.properties.className as string).split(/\s+/)
          : [];
        if (classList.includes('task-list-item')) {
          if (!classList.includes('has-checkbox')) classList.push('has-checkbox');
          node.properties = node.properties || {};
          node.properties.className = classList;
        }
      }

      // Replace checkbox inputs with custom span
      if (
        node.tagName === 'input' &&
        node.properties?.type === 'checkbox' &&
        parent &&
        Array.isArray(parent.children)
      ) {
        const isChecked = Boolean(node.properties.checked);

        const spanNode = {
          type: 'element',
          tagName: 'span',
          properties: {
            className: [
              'chcklst-box',
              'inline-block',
              'mr-2',
              'shrink-0',
              'align-middle',
              'rounded-[2px]',
              'size-[20px]',
              'border',
              'text-center',
              ...(isChecked
                ? ['bg-emerald-500', 'border-emerald-500']
                : ['bg-transparent', 'border-gray-400', 'dark:border-gray-600']),
            ],
          },
          children: isChecked ? [{type: 'text', value: '✓', className:'font-bold'}] : [],
        } as const;

        const idx = parent.children.indexOf(node);
        if (idx !== -1) parent.children.splice(idx, 1, spanNode as any);
      }
    });
  };
}



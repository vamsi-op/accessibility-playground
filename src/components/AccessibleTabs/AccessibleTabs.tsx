import React from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface AccessibleTabsProps {
  tabs: Tab[];
  defaultActiveId?: string;
}

export const AccessibleTabs: React.FC<AccessibleTabsProps> = ({ tabs, defaultActiveId }) => {
  const [activeTabId, setActiveTabId] = React.useState(defaultActiveId || tabs[0]?.id);
  const tablistRef = React.useRef<HTMLDivElement>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!tablistRef.current) return;
    const tabs = Array.from(tablistRef.current.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const currentTabIndex = tabs.findIndex(tab => tab.id === `tab-${activeTabId}`);

    let nextTabIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        nextTabIndex = (currentTabIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        nextTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextTabIndex = 0;
        break;
      case 'End':
        nextTabIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    if (nextTabIndex !== -1) {
      event.preventDefault();
      const nextTab = tabs[nextTabIndex];
      nextTab.focus();
      setActiveTabId(nextTab.id.replace('tab-', ''));
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Accessible Tabs"
        ref={tablistRef}
        onKeyDown={handleKeyDown}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-controls={`panel-${tab.id}`}
            aria-selected={activeTabId === tab.id}
            onClick={() => handleTabClick(tab.id)}
            tabIndex={activeTabId === tab.id ? 0 : -1}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map(tab => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTabId !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

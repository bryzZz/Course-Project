interface TabPanelProps<T> {
  value: T;
  tabValue: T;
  children?: React.ReactNode;
}

export const TabPanel = <T,>({
  value,
  tabValue,
  children,
}: TabPanelProps<T>): JSX.Element => {
  return <div hidden={value !== tabValue}>{children}</div>;
};

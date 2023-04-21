interface TabPanelProps<T> {
  value: T;
  tabValue: T;
  children: JSX.Element[] | JSX.Element | null;
  remount?: boolean;
}

export const TabPanel = <T,>({
  value,
  tabValue,
  children,
  remount,
}: TabPanelProps<T>): JSX.Element | null => {
  if (remount) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{value === tabValue && children}</>;
  }

  return <div hidden={value !== tabValue}>{children}</div>;
};

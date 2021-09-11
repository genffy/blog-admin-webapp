export interface MenuItem {
  url: string;
  title: string;
}

export interface Menu {
  url: string,
  icon: string,
  title: string,
  type: number,
  children: MenuItem[];
}
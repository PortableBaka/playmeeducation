export const GetBasicTableColumns = [
  {
    title: "naming",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "for_who",
    dataIndex: "can_view",
    key: "can_view",
    render: (text) => <p className="tableTextInner">{text}</p>,
  },
];

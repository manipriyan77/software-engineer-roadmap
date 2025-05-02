import { useState } from 'react';
import data from './data.json';

type ListTypes = {
  name: string;
  isFolder: boolean;
  children: {
    name: string;
    isFolder: boolean;
  }[];
};

function List({ list }: Array<ListTypes>) {
  const [expand, setExpand] = useState({ public: true });
  return (
    <div className="list_container">
      {list.map((node: ListTypes, index: number) => {
        return (
          <section key={index}>
            <span>{node.children && expand?.[node.name] && '-'}</span>
            <span>{node.children && !expand?.[node.name] && '+'}</span>
            <span
              onClick={() =>
                setExpand((prev) => {
                  return { ...prev, [node.name]: !prev[node.name] };
                })
              }
            >
              {node.name}
            </span>
            {node.children && expand?.[node.name] && <List list={node.children} />}
          </section>
        );
      })}
    </div>
  );
}

const VsCodeSidebar = () => {
  return (
    <>
      <List list={data} />
    </>
  );
};

export default VsCodeSidebar;

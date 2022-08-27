import type { FC } from "react";

interface Props {
  data: string[];
}

const Tabel: FC<Props> = ({ data }) => {
  return (
    <table className="tabel w-full ">
      <thead>
        <tr className="grid grid-cols-12">
          <th className="">No.</th>
          <th className="col-span-8">Program</th>
          <th className="col-span-3">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="grid grid-cols-12">
            <td>{index + 1}</td>
            <td className="col-span-8 text-center font-bold">{item}</td>
            <td className="col-span-3 button-primary-sm">
              <a href={`/detail/${item}`}>view</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabel;

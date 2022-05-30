import React, { useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { importStudents } from "../api/students";
import Link from "next/link";
import { useRouter, Router } from "next/router";

const StudentsImport = () => {
  const [data, setData] = useState(null);
  const router = useRouter()
  const fileHandler = (event) => {
    let fileObj = event?.target?.files?.[0];

    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
        setData(resp);
      }
    });
  };

  const importRequest = async () => {
    try {
      const payload = data.rows.map((x) => ({
        lastName: x[0],
        firstName: x[1],
        middleName: x[2],
        email: x[3],
        phone: x[4].toString(),
        nationality: x[5],
        groupName: x[6],
      }));
      await importStudents(payload);
      router.push("/students")
    } catch {
      console.error("error in import");
    }
  };
  return (
    <div>
     <div className="d-flex justify-content-center mb-3" > <h1>Импорт студентов</h1></div>
      <div> <div className="">
      <input
        type="file"
        onChange={fileHandler}
        className="btn btn-outline-primary "
      />
      {data && (
        <OutTable className=" w-100%"
          data={data.rows}
          columns={data.cols}
          tableClassName="ExcelTable2007"
          tableHeaderRowClass="heading"
        />
      )}
</div>
<div className="d-flex flex-gap p-3">
      <Link href="/students">
        <a className="btn btn-primary" >Отмена</a>
      </Link>
      <button className="btn btn-primary" onClick={importRequest}>OK</button>
    </div></div></div>
  );
};

export default StudentsImport;

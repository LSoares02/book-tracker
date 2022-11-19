import React, { useState, useEffect } from "react";
import {
  Modal,
  Grid,
  FormGroup,
  TextInput,
  Column,
  Stack,
  SelectItem,
  Select,
  DatePicker,
  DatePickerInput,
} from "@carbon/react";
import { useGlobalState } from "../../hooks/globalState";

import "./style.scss";
import BasicRating from "../Rating";
import generateDate from "../../helpers/generateDate";
import { insertBook } from "../../helpers/apiCalls";

const options = [
  { text: "Quero Ler", value: 0 },
  { text: "Lendo", value: 1 },
  { text: "Lido", value: 2 },
];

export default function BookInfoModal() {
  const {
    user,
    books,
    setBooks,
    openBookInfoModal,
    setOpenBookInfoModal,
    bookInfo,
    setBookInfo,
  } = useGlobalState();

  const [readyToProceed, setReadyToProceed] = useState(false);
  const [datePickerDisabled, setDatePickerdisabled] = useState(true);

  useEffect(() => {
    console.log(bookInfo);

    if (bookInfo.dateCompleted || bookInfo.status === options[2].text)
      setDatePickerdisabled(false);
    else setDatePickerdisabled(true);
    setReadyToProceed(
      Object.entries(bookInfo).every(([key, value]) => {
        if (key === "title" || key === "author") {
          if (value.length > 0) return true;
        } else return true;
      })
    );
  }, [bookInfo]);

  async function handleSubmit() {
    const response = await insertBook(bookInfo, user);
    const index = books.findIndex((book) => book._id === bookInfo._id);
    if (index != -1) {
      books[index] = bookInfo;
      setBooks(books);
    } else {
      const mongoId = response?.upserted[0]?._id;
      if (mongoId) bookInfo._id = mongoId;
      setBooks([bookInfo].concat(books));
    }
    setOpenBookInfoModal(false);
  }

  return (
    <Modal
      id={"bookInfoModal"}
      open={openBookInfoModal}
      modalHeading={"Editando Livro..."}
      primaryButtonDisabled={!readyToProceed}
      primaryButtonText={"Salvar"}
      secondaryButtonText={"Cancelar"}
      onRequestClose={() => {
        setOpenBookInfoModal(false);
      }}
      onRequestSubmit={handleSubmit}
      preventCloseOnClickOutside
    >
      <FormGroup legendId="form-group-1">
        <Grid>
          <Column sm={2} md={4} lg={8} xlg={8}>
            <Stack gap={5}>
              <TextInput
                value={bookInfo.title}
                id="titleInput"
                labelText="Título"
                onChange={(e) => {
                  console.log(e);
                  const clone = { ...bookInfo };
                  clone.title = e.target.value;
                  setBookInfo(clone);
                }}
              />
              <TextInput
                value={bookInfo.author}
                id="authorInput"
                labelText="Autor"
                onChange={(e) => {
                  const clone = { ...bookInfo };
                  clone.author = e.target.value;
                  setBookInfo(clone);
                }}
              />
            </Stack>
          </Column>

          <Column sm={2} md={4} lg={8} xlg={8}>
            <Stack gap={5}>
              <Select
                value={
                  options.find((option) => option.text === bookInfo.status)
                    ?.value
                }
                id="select-1"
                labelText="Select an option"
                onChange={(e) => {
                  const clone = { ...bookInfo };
                  if (e.target.value != 2) {
                    clone.dateCompleted = null;
                    clone.score = null;
                  }
                  clone.status = options.find(
                    (option) => option.value == e.target.value
                  ).text;
                  setBookInfo(clone);
                }}
              >
                {options.map((option) => (
                  <SelectItem text={option.text} value={option.value} />
                ))}
              </Select>
              <DatePicker
                datePickerType="single"
                onChange={(e) => {
                  const clone = { ...bookInfo };
                  if (e.length > 0) {
                    clone.dateCompleted = generateDate(e);
                  } else {
                    clone.dateCompleted = null;
                  }
                  setBookInfo(clone);
                }}
                dateFormat={"d/m/Y"}
              >
                <DatePickerInput
                  value={bookInfo.dateCompleted || ""}
                  disabled={datePickerDisabled}
                  id="date-picker-single"
                  labelText="Data de Conclusão"
                  placeholder="dd/mm/yyyy"
                />
              </DatePicker>
            </Stack>
          </Column>
          <Column sm={4} md={8} lg={16} xlg={16}>
            <BasicRating disabled={!bookInfo.dateCompleted} />
          </Column>
        </Grid>
      </FormGroup>
    </Modal>
  );
}

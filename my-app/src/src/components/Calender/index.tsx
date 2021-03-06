import { FC } from "react";
import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import './style.css'
import { Box } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import SwipeItem from "../SwipeItem";
// import SearchIcon from '@material-ui/icons/Search';
// import TodayIcon from '@material-ui/icons/Today';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

interface Props {
  date: Date;
  month: Date;
}

interface Size {
  width: number;
}

const Calendar: FC<Props> = (props) => {
  const { date, month } = props;
  const [ selectedDate, ] = useState<Date>(date); //setSelectedDate
  const [ currentMonth, setCurrentMonth ] = useState<Date>(month);

  // const onDateClick = (day: Date) => {
  //   setSelectedDate(day);
  // };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    // const monthStart = startOfMonth(currentMonth);
    // setSelectedDate(monthStart);
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    // const monthStart = startOfMonth(currentMonth);
    // setSelectedDate(monthStart);
  };

  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<Size>({
      width: 600,
    });
    
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  const renderHeader = () => {
    const dateFormats = "MMMM yyyy";

    return (
      <div className="header row">
        <div className="col">
          <div className="col-start">
            <div className="icon" onClick={prevMonth}>
              {'<'}
            </div>
            <div className="icon">
              {format(currentMonth, dateFormats)}
            </div>
            <div className="icon" onClick={nextMonth}>
              {'>'}
            </div>
            {/* <div className="icon col-end">
              <SearchIcon />
            </div>
            <div className="icon col-end">
              <TodayIcon />
            </div>
            <div className="icon col-end">
              <MoreHorizIcon />
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  const size: Size = useWindowSize();

  const renderDays = () => {
    let dayFormat;
    if(size.width < 500) {
      dayFormat="EEEEE";
    } else {
      dayFormat="E";
    }

    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dayFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormats = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormats);
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={formattedDate.toString()}
            onClick={() => {}}
          >
            <span className="number">{formattedDate}</span>
            <br />
            <span className={`dot ${
              !isSameMonth(day, monthStart)
                ? "disabled" : ""
                }`}>.</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  return (
    <Box className="Root"> 
      <Box className="MainContainer">
        <Box className="calendar">
          {renderHeader()}
          {renderDays()}
          <SwipeItem onSwipeRTL={() => nextMonth()} onSwipeLTR={() => prevMonth()}>
            {renderCells()}
          </SwipeItem>
        </Box>
      </Box>
    </Box>
  );
}

export default Calendar;
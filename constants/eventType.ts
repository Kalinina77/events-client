export const EventСontest = "Соревнования";
export const EventVisit = "Посещение";
export const EventTypeDisplay = {
  [EventСontest]: "Соревнование",
  [EventVisit]: "Посещение",
};

export const EventTypeOptions = [
  { value: EventСontest, label: EventTypeDisplay[EventСontest] },
  { value: EventVisit, label: EventTypeDisplay[EventVisit] },
];

export const PlaceOptions =[
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
]

export const PlaceOptionsSimple =[
 undefined,"1","2","3"
]
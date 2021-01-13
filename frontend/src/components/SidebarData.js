import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from "react-icons/bi";
import * as TiIcons from "react-icons/ti";
import * as BsIcons from "react-icons/bs";
import * as FlatIcons from "react-icons/fc";

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Add building',
    path: '/buildings',
    icon: <BiIcons.BiBuildingHouse />,
    cName: 'nav-text'
  },
  {
    title: 'Add Hall',
    path: '/halls',
    icon: <IoIcons.IoIosAdd />,
    cName: 'nav-text'
  },
  {
    title: 'Statistics per building',
    path: '/building-stats',
    icon: <FlatIcons.FcStatistics />,
    cName: 'nav-text'
  },
  {
    title: 'Statistics per floor',
    path: '/floor-stats',
    icon: <FlatIcons.FcStatistics />,
    cName: 'nav-text'
  },
  {
    title: 'Statistics per hall',
    path: '/hall-stats',
    icon: <FlatIcons.FcStatistics />,
    cName: 'nav-text'
  },
  {
    title: 'Import',
    path: '/import',
    icon: <BsIcons.BsUpload/>,
    cName: 'nav-text'
  },
  {
    title: 'Export',
    path: '/export',
    icon: <TiIcons.TiExport/>,
    cName: 'nav-text'
  }
  
];

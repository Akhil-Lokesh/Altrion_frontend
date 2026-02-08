import{j as n,m as i}from"./animations-DMW0BnLD.js";function m({children:d,variant:a="default",hover:r=!1,padding:o="md",className:e=""}){const s={default:"bg-dark-card",elevated:"bg-dark-elevated",bordered:"bg-dark-card border border-dark-border"},t={none:"",sm:"p-4",md:"p-6",lg:"p-8"};return n.jsx(i.div,{whileHover:r?{scale:1.02,y:-2}:void 0,className:`
        ${s[a]}
        ${t[o]}
        rounded-2xl
        transition-shadow duration-200
        ${r?"cursor-pointer hover:shadow-lg hover:shadow-altrion-500/10":""}
        ${e}
      `,children:d})}export{m as C};

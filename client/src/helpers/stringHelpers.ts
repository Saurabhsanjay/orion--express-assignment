 //for trimming the title
 export const trimTitle = (title:string) => {
    const maxLength = 20;
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength) + "...";
  };

  //for trimming the description 
 export const trimDescription = (description:string) => {
    const maxLength = 30;
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "...";
  };

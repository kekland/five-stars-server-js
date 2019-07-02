import{r as a,h as t}from"./p-b1a34f82.js";import"./p-4bed3927.js";import"./p-9f198786.js";import{a as e}from"./p-9135763f.js";import{i}from"./p-d1236c30.js";import{v as s}from"./p-61aa703e.js";class o{constructor(t){a(this,t)}async toggleVerified(){const a=await e.post(`http://localhost:3008/admin/cargo/${this.data.meta.id}/setVerifiedStatus`,{status:!this.data.verified});this.data=a.data,this.onChanged(this.data)}showProfile(){this.history.push(`/user/${this.data.owner.id}`)}render(){return t("div",{class:"f-cargo"},t("f-card",null,t("f-info",{desc:"Идентификатор",value:this.data.meta.id,color:"#888888"}),t("f-info",{desc:"Город погрузки",value:this.data.departure.name}),t("f-info",{desc:"Город выгрузки",value:this.data.arrival.name}),t("f-info",{desc:"Дата погрузки",value:new Date(this.data.departureTime).toLocaleDateString("ru")}),t("f-properties",{value:this.data.properties}),t("f-info",{desc:"Д×Ш×В (см)",value:`${this.data.dimensions.length}×${this.data.dimensions.width}×${this.data.dimensions.height}`}),t("f-cargo-information",{value:this.data.information}),t("f-info",{desc:"Архивирован",value:this.data.archived?"Да":"Нет"}),t("f-info",{desc:"Верифицирован",value:this.data.verified?"Да":"Нет"}),t("f-info",{desc:"Владелец",value:this.data.owner.id}),t("f-info",{desc:"Создано",value:new Date(this.data.meta.created).toLocaleString("ru")}),t("f-info",{desc:"Обновлено",value:new Date(this.data.meta.updated).toLocaleString("ru")}),t("f-images",{images:this.data.images}),t("f-button",{fluid:!0,onTap:()=>this.toggleVerified(),buttonClass:"primary"},this.data.verified?"Снять верификацию":"Верифицировать"),t("f-button",{fluid:!0,onTap:()=>this.showProfile(),buttonClass:"secondary"},"Показать профиль")))}static get style(){return".f-cargo{margin:16px}"}}i(o);class r{constructor(t){a(this,t)}render(){return t("div",{class:"f-cargo-information"},t("f-info",{desc:"Описание",value:this.value.description}),t("f-info",{desc:"Тип транспорта",value:s[this.value.vehicleType]}),t("f-info",{desc:"Опасный груз?",value:this.value.dangerous?"Да":"Нет"}))}static get style(){return".f-cargo-information{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row}.f-cargo-information>*{margin-right:16px}"}}export{o as f_cargo,r as f_cargo_information};
data.settings = [
    {k: "idle_money_ps", display(val){return data.money_pp * data.idle_craft_ps}}
];

data.material = 0;
data.ink = 0;
data.money = 1000;

data.material_pc = 1;
data.ink_pc = 1;
data.craft_pc = 1;

data.idle_material_ps = 0;
data.idle_ink_ps = 0;
data.idle_craft_ps = 0;

data.money_pp = 1;
data.material_pp = 10;
data.ink_pp = 10;

data.idle_money_ps = 0;

data.cost_upgrade_mat_pc = 10;
data.cost_upgrade_ink_pc = 10;
data.cost_upgrade_craft_pc = 10;
data.cost_upgrade_money_pp = 100;

data.cost_upgrade_mat_idle = 10;
data.cost_upgrade_ink_idle = 10;
data.cost_upgrade_craft_idle = 10;

//#region Dom Constants
const get_material = $("#get-material")[0];
const get_ink = $("#get-ink")[0];
const craft_sell = $("#craft-sell")[0];
const craft_infos = $(".craft-info");
craft_infos.css("display", "none");
const upgrade_mat = $("#upgrade-mat-pc")[0];
const upgrade_ink = $("#upgrade-ink-pc")[0];
const upgrade_craft = $("#upgrade-craft-pc")[0];
const upgrade_money_pp = $("#upgrade-money-pp")[0];
const upgrade_idle_mat = $("#upgrade-idle-material")[0];
const upgrade_idle_ink = $("#upgrade-idle-ink")[0];
const upgrade_idle_craft = $("#upgrade-idle-craft")[0];
//#endregion
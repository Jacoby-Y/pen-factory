const max_pens_pc = ()=>{
    const max_material = Math.floor(data.material / data.material_pp);
    const max_ink = Math.floor(data.ink / data.ink_pp);
    return Math.min(max_material, max_ink);
}

settings = [
    {k:"idle_money_ps", display(val){return data.money_pp * data.idle_craft_ps}},
    {k:"money", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_mat_pc", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_ink_pc", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_craft_pc", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_money_pp", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_mat_idle", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_ink_idle", display(val){return Math.round(val*10)/10}},
    {k:"cost_upgrade_craft_idle", display(val){return Math.round(val*10)/10}},
    {k:"cost_prestige_material", display(val){return Math.round(val*10)/10}},
    {k:"cost_prestige_ink", display(val){return Math.round(val*10)/10}},
    {k: "idle_craft_ps", display(val){
        const max_pens = max_pens_pc();
        let current = 0;
        if (max_pens > val) current = val;
        else current = max_pens;
        return `${current} pen/sec\nMax: ${val}`;
    }}
];

if (local.can_load()) {
    data = local.load();
    data.settings = settings;
    local.finish();

    if (data.can_win)  $("#win-game")[0].innerHTML = "<h3>Start a monopoly</h3><h4 watch>Cost: {win_game_cost}</h4>";
    if (data.material_pp == 1) $("#reduce-material")[0].innerHTML = "<h3>*Maxed out*</h3>";
    if (data.ink_pp == 1) $("#reduce-ink")[0].innerHTML = "<h3>*Maxed out*</h3>";
} else {
    data.settings = settings;

    data.material = 0;
    data.ink = 0;
    data.money = 0;
    
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
    
    data.cost_prestige_material = 1000;
    data.cost_prestige_ink = 1000;
    
    data.can_win = false;
    data.win_game_cost = 100000;
}

//#region Dom Constants
const get_material = $("#get-material")[0];
const get_ink = $("#get-ink")[0];
const craft_sell = $("#craft-sell")[0];
const craft_infos = $(".craft-info");
const upgrade_mat = $("#upgrade-mat-pc")[0];
const upgrade_ink = $("#upgrade-ink-pc")[0];
const upgrade_craft = $("#upgrade-craft-pc")[0];
const upgrade_money_pp = $("#upgrade-money-pp")[0];
const upgrade_idle_mat = $("#upgrade-idle-material")[0];
const upgrade_idle_ink = $("#upgrade-idle-ink")[0];
const upgrade_idle_craft = $("#upgrade-idle-craft")[0];
const reduce_material = $("#reduce-material")[0];
const reduce_ink = $("#reduce-ink")[0];
const win_game = $("#win-game")[0];
//#endregion
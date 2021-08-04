const get_material = $("#get-material")[0];
const get_ink = $("#get-ink")[0];
const craft_sell = $("#craft-sell")[0];
const craft_infos = $(".craft-info");
craft_infos.css("display", "none");
// console.log(craft_infos);
const upgrade_mat = $("#upgrade-mat-pc")[0]
const upgrade_ink = $("#upgrade-ink-pc")[0]
const upgrade_craft = $("#upgrade-craft-pc")[0]
const upgrade_money_pp = $("#upgrade-money-pp")[0]
get_material.onclick = ()=>{
    data.material = data.material + data.material_pc;
}
get_ink.onclick = ()=>{
    data.ink = data.ink + data.ink_pc;
}
craft_sell.onclick = () => {
    const material_per = data.material_pp;
    let material = data.material;
    const ink_per = data.ink_pp;
    let ink = data.ink;
    let money = data.money;
    const craft_pc = data.craft_pc;
    let i = 0
    while (material >= material_per && ink >= ink_per && i < craft_pc) {
        console.log(money)
        money = money + data.money_pp ;
        material -= material_per;
        ink -= ink_per;
        i++;
    }
    data.material = material;
    data.ink = ink;
    data.money = money;
}

const max_pens_pc = ()=>{
    const max_material = Math.floor(data.material / data.material_pp);
    const max_ink = Math.floor(data.ink / data.ink_pp);
    return Math.min(max_material, max_ink);
}

craft_sell.onmouseenter = ()=>{
    craft_infos.css("display", "block");
    const max_pens = max_pens_pc();
    if (max_pens > 0) {
        craft_infos.css("color", "green");
        craft_infos[0].innerText = `-${data.material_pp*max_pens}`;
        craft_infos[1].innerText = `-${data.ink_pp*max_pens}`;
    } else {
        craft_infos.css("color", "red");
        craft_infos[0].innerText = `-${data.material_pp}`;
        craft_infos[1].innerText = `-${data.ink_pp}`;
    }
}
craft_sell.onmouseleave = ()=>{
    craft_infos.css("display", "none");
}

upgrade_mat.onclick = ()=>{
    if (data.money >= data.cost_upgrade_mat_pc){
        data.money -=data.cost_upgrade_mat_pc;
        data.material_pc +=1;
    }
}
upgrade_ink.onclick = ()=>{
    if (data.money >= data.cost_upgrade_ink_pc){
        data.money -=data.cost_upgrade_ink_pc;
        data.ink_pc +=1;
    }
}
upgrade_craft.onclick = ()=>{
    if (data.money >= data.cost_upgrade_craft_pc){
        data.money -=data.cost_upgrade_craft_pc;
        data.craft_pc +=1;
    }
}
upgrade_money_pp.onclick = ()=>{
    if (data.money >= data.cost_upgrade_money_pp){
        data.money -=data.cost_upgrade_money_pp;
        data.money_pp +=1;
    }
}
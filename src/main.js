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
        // console.log(money)
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
data.settings.push({k: "idle_craft_ps", display(val){
    const max_pens = max_pens_pc();
    let current = 0;
    if (max_pens > val) current = val;
    else current = max_pens;
    return `${current} pen/sec\nMax: ${val}`;
}});
data.idle_craft_ps = data.idle_craft_ps;

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

upgrade_idle_mat.onmouseenter = ()=>{ upgrade_idle_mat.lastElementChild.style.display = "block"; }
upgrade_idle_mat.onmouseleave = ()=>{ upgrade_idle_mat.lastElementChild.style.display = "none"; }

upgrade_idle_ink.onmouseenter = ()=>{ upgrade_idle_ink.lastElementChild.style.display = "block"; }
upgrade_idle_ink.onmouseleave = ()=>{ upgrade_idle_ink.lastElementChild.style.display = "none"; }

upgrade_idle_craft.onmouseenter = ()=>{ upgrade_idle_craft.lastElementChild.style.display = "block"; }
upgrade_idle_craft.onmouseleave = ()=>{ upgrade_idle_craft.lastElementChild.style.display = "none"; }

upgrade_mat.onclick = ()=>{
    if (data.money >= data.cost_upgrade_mat_pc){
        data.money -=data.cost_upgrade_mat_pc;
        data.material_pc++;
    }
}
upgrade_ink.onclick = ()=>{
    if (data.money >= data.cost_upgrade_ink_pc){
        data.money -=data.cost_upgrade_ink_pc;
        data.ink_pc++;
    }
}
upgrade_craft.onclick = ()=>{
    if (data.money >= data.cost_upgrade_craft_pc){
        data.money -=data.cost_upgrade_craft_pc;
        data.craft_pc++;
    }
}
upgrade_money_pp.onclick = ()=>{
    if (data.money >= data.cost_upgrade_money_pp){
        data.money -=data.cost_upgrade_money_pp;
        data.money_pp++;
    }
}
upgrade_idle_mat.onclick = () => {
    if (data.money >= data.cost_upgrade_mat_idle){
        data.money -= data.cost_upgrade_mat_idle;
        data.idle_material_ps++;
    }
}
upgrade_idle_ink.onclick = () => {
    if (data.money >= data.cost_upgrade_ink_idle){
        data.money -= data.cost_upgrade_ink_idle;
        data.idle_ink_ps++;
    }
}
upgrade_idle_craft.onclick = () => {
    if (data.money >= data.cost_upgrade_craft_idle){
        data.money -= data.cost_upgrade_craft_idle;
        data.idle_craft_ps++;
    }
}

const idle_loop = setInterval(() => {
    const max_pen = max_pens_pc();
    if (data.idle_material_ps > 0) data.material += data.idle_material_ps
    if (data.idle_ink_ps > 0) data.ink += data.idle_ink_ps
    if (data.idle_craft_ps <= 0) return;

    if (data.idle_craft_ps < max_pen ){
        data.money += data.idle_craft_ps * data.money_pp
        data.material -= data.idle_craft_ps * data.material_pp
        data.ink -= data.idle_craft_ps * data.ink_pp
        data.idle_craft_ps = data.idle_craft_ps;
    }else{
        data.money += max_pen* data.money_pp 
        data.material -= max_pen * data.material_pp
        data.ink -= max_pen * data.ink_pp
        data.idle_craft_ps = data.idle_craft_ps;
    }
}, 1000);
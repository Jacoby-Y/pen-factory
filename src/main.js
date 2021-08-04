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

data.idle_craft_ps = data.idle_craft_ps;

// upgrade_idle_mat.onmouseenter = ()=>{ upgrade_idle_mat.lastElementChild.style.display = "block"; }
// upgrade_idle_mat.onmouseleave = ()=>{ upgrade_idle_mat.lastElementChild.style.display = "none"; }

// upgrade_idle_ink.onmouseenter = ()=>{ upgrade_idle_ink.lastElementChild.style.display = "block"; }
// upgrade_idle_ink.onmouseleave = ()=>{ upgrade_idle_ink.lastElementChild.style.display = "none"; }

// upgrade_idle_craft.onmouseenter = ()=>{ upgrade_idle_craft.lastElementChild.style.display = "block"; }
// upgrade_idle_craft.onmouseleave = ()=>{ upgrade_idle_craft.lastElementChild.style.display = "none"; }

upgrade_mat.onclick = ()=>{
    if (data.money >= data.cost_upgrade_mat_pc){
        data.money -=data.cost_upgrade_mat_pc;
        data.cost_upgrade_mat_pc *= 1.5;
        data.material_pc++;
    }
}
upgrade_ink.onclick = ()=>{
    if (data.money >= data.cost_upgrade_ink_pc){
        data.money -= data.cost_upgrade_ink_pc;
        data.cost_upgrade_ink_pc *= 1.5;
        data.ink_pc++;
    }
}
upgrade_craft.onclick = ()=>{
    if (data.money >= data.cost_upgrade_craft_pc){
        data.money -=data.cost_upgrade_craft_pc;
        data.cost_upgrade_craft_pc *= 1.5;
        data.craft_pc++;
    }
}
upgrade_money_pp.onclick = ()=>{
    if (data.money >= data.cost_upgrade_money_pp){
        data.money -=data.cost_upgrade_money_pp;
        data.cost_upgrade_money_pp *= 1.2;
        data.money_pp++;
    }
}
upgrade_idle_mat.onclick = () => {
    if (data.money >= data.cost_upgrade_mat_idle){
        data.money -= data.cost_upgrade_mat_idle;
        data.cost_upgrade_mat_idle *= 1.5;
        data.idle_material_ps++;
    }
}
upgrade_idle_ink.onclick = () => {
    if (data.money >= data.cost_upgrade_ink_idle){
        data.money -= data.cost_upgrade_ink_idle;
        data.cost_upgrade_ink_idle *= 1.5;
        data.idle_ink_ps++;
    }
}
upgrade_idle_craft.onclick = () => {
    if (data.money >= data.cost_upgrade_craft_idle){
        data.money -= data.cost_upgrade_craft_idle;
        data.cost_upgrade_craft_idle *= 1.5;
        data.idle_craft_ps++;
    }
}

const idle_loop = setInterval(() => {
    local.store();
    // console.log(local.load().ink);

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

reduce_ink.onclick = () =>{
    if(data.ink_pp > 1 && data.money >= data.cost_prestige_ink  ){
        data.money -= data.cost_prestige_ink;
        data.cost_prestige_ink *= 1.25;
        data.ink_pp -= 1;
    } 
    if (data.ink_pp <= 1) {
        reduce_ink.innerHTML = "<h3>*Maxed out*</h3>"
        if(data.material_pp <= 1){
            $("#win-game")[0].innerHTML = "<h3>Start a monopoly</h3><h4 watch>Cost: {win_game_cost}</h4>";
            data.win_game_cost = data.win_game_cost;
            data.can_win = true;
        }
    }
}
reduce_material.onclick = () =>{
    if(data.material_pp >1 && data.money >= data.cost_prestige_material  ){
        data.money -= data.cost_prestige_material;
        data.cost_prestige_material *= 1.25;
        data.material_pp -=1;
    } 
    if (data.material_pp <= 1) {
        reduce_material.innerHTML = "<h3>*Maxed out*</h3>";
        if(data.ink_pp <= 1){
            $("#win-game")[0].innerHTML = "<h3>Start a monopoly</h3><h4 watch>Cost: {win_game_cost}</h4>";
            data.win_game_cost = data.win_game_cost;
            data.can_win = true;
        }
    }
}
$("#win-game")[0].onclick = ()=>{
    if (data.can_win && data.money >= data.win_game_cost){
        alert("After all these years, you finally have a monopoly over the pen industry. You pens will be remembered for the next thousand years!");
    }
}
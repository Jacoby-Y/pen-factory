
const get_material = $("#get-material")[0];
const get_ink = $("#get-ink")[0];
const craft_sell = $("#craft-sell")[0];
const craft_infos = $(".craft-info");
craft_infos.css("display", "none");
// console.log(craft_infos);

get_material.onclick = ()=>{
    data.material = data.material.value + data.material_pc.value;
}
get_ink.onclick = ()=>{
    data.ink = data.ink.value + data.ink_pc.value;
}
craft_sell.onclick = () => {
    const material_per = data.material_pp.value;
    let material = data.material.value;
    const ink_per = data.ink_pp.value;
    let ink = data.ink.value;
    let money = data.money.value;
    const craft_pc = data.craft_pc.value;
    let i = 0
    while (material >= material_per && ink >= ink_per && i < craft_pc) {
        money = data.money.value + data.money_pp.value ;
        material -= material_per;
        ink -= ink_per;
        i++;
    }
    data.material = material;
    data.ink = ink;
    data.money = money;
}

const max_pens_pc = ()=>{
    const max_material = Math.floor(data.material.value / data.material_pp);
    const max_ink = Math.floor(data.ink.value / data.ink_pp);
    return Math.min(max_material, max_ink);
}

craft_sell.onmouseenter = ()=>{
    craft_infos.css("display", "block");
    const max_pens = max_pens_pc();
    if (max_pens > 0) {
        craft_infos.css("color", "green");
        craft_infos[0].innerText = `-${data.material_pp.value*max_pens}`;
        craft_infos[1].innerText = `-${data.ink_pp.value*max_pens}`;
    } else {
        craft_infos.css("color", "red");
        craft_infos[0].innerText = `-${data.material_pp.value}`;
        craft_infos[1].innerText = `-${data.ink_pp.value}`;
    }
}
craft_sell.onmouseleave = ()=>{
    craft_infos.css("display", "none");
}

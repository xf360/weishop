function list2tree(source, pid, option) {
  if (!option) {
    option = {
      sourcePid: 'p_Id', //原数据父键
      sourceKey: 'id', //原数据主键
      sourceTitle:'name',//
      targetKey:'value',
      targetValue:'id',
      targetTitle:'name',
      targetChildren:'children'
    }
  }
  if (!source) {
    return []
  }
  var ret = []
  var list = source.filter(item => item[option.sourcePid] === pid)
  if (!list || list.length == 0) {
    return []
  }
  for (var index in list) {
    // var tmp = {
    //   value: list[index].id,
    //   label: list[index].name,
    //   children: []
    // }
    var tmp={};
    tmp[option.sourceKey]=list[index][option.sourceKey];
    tmp[option.targetKey]=list[index][option.targetValue];
    tmp[option.targetTitle]=list[index][option.sourceTitle];
    tmp[option.targetChildren]=[];
    var sublist = list2tree(source, tmp[option.sourceKey],option)
    tmp[option.targetChildren] = sublist
    ret.push(tmp)
  }
  return ret
}

function list2treetable(source, pid) {
  if (!source) {
    return []
  }
  var ret = []
  var list = source.filter(item => item.p_Id === pid)
  if (!list || list.length == 0) {
    return null
  }
  for (var index in list) {
    var tmp = list[index];
    var sublist = list2treetable(source, tmp.id)
    tmp.children = sublist
    ret.push(tmp)
  }
  return ret
}
export default {
  list2tree,
  list2treetable
}

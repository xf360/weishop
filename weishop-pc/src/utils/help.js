function list2tree (source, pid) {
  if (!source) {
    return []
  }
  var ret = []
  var list = source.filter(item => item.p_Id === pid)
  if (!list || list.length == 0) {
    return []
  }
  for (var index in list) {
    var tmp = {
      value: list[index].id,
      label: list[index].name,
      children: []
    }
    var sublist = list2tree(source, tmp.value)
    tmp.children = sublist
    ret.push(tmp)
  }
  return ret
}
function list2treetable (source, pid) {
  debugger
  if (!source) {
    return []
  }
  var ret = []
  var list = source.filter(item => item.p_Id === pid)
  if (!list || list.length == 0) {
    return null
  }
  for (var index in list) {
    var tmp=list[index];
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

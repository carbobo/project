<?php
//瀑布流的ajax异步数据传输
public function ajax(){
$page=$_POST['page']; //获取ajax发送过来的页数-第几页
$type=$_POST['type']; //获取ajax发送过来的类型-Android、iPhone、WindowsPhone、Other
//每次取出10条数据
$pagesize=15;
$m=M('article');
//limit(($page-1)*$pagesize,$pagesize);从第几条开始取，取出几条；用页数来判断从第几条开始取
$content=$m->where(array('delete'=>0,'type'=>$type))->field('id,title,intro,date')->order('date desc')->limit(($page-1)*$pagesize,$pagesize)->select();
if($content){
$this->ajaxReturn($content,'json');
}else{
$this->ajaxReturn(array('status'=>0),'json');
}
}

?>
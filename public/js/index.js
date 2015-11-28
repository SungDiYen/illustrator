landing_view();
$(window).resize(landing_view);
slide_to_project();
var nav_height = $('.js-nav').height();
nav_fixed(nav_height);
scrollSpy();


    //調整 Landing View
    function landing_view(){
        var screen_height = $(window).height();
        var screen_width  = $(window).width();
        var landing_video_rwd = $('.landing__bg').height();
        $('.landing').css({
            'height': screen_height,
            'width': screen_width,
        });
        if(landing_video_rwd > screen_height){
            $('.landing__bg').removeClass('height').addClass('width');
        }else if(landing_video_rwd == screen_height){
            if( screen_width > $('.landing__bg').width() ){
                $('.landing__bg').removeClass('height').addClass('width');
            }
        }else {
            $('.landing__bg').removeClass('width').addClass('height');
        }
        //console.log(landing_video_rwd,screen_height);
    }
    

    // 快速進入作品區
    function slide_to_project(){
        $('#js-slide--down').click(function(event) {
            var dist = $('#js-works').offset();
            var body = $('html, body');
            body.animate({scrollTop: dist.top}, '500', 'swing', function() {});
        });
    }



    //nav_bar 滾動固定
    function nav_fixed(navHeight) {
        $(window).scroll(function(){
            var window_position = $('body').scrollTop();
            if( window_position > ( $(window).height() - nav_height ) ) {
                $('.header--main').addClass('fixed');
            }else {
                $('.header--main').removeClass('fixed');
            }
            //console.log(window_position);
        })
    };


    // 滾動監視
    function scrollSpy(){
        // 取得對應位置，監視位置與頂端的高度距離
        var spy_node = $('a[role="spy_node"]');
        var spy_node_num = spy_node.length -1;
        var spy_segment_id = [];
        var spy_swgmant_dist = [];
        
        function get_id_and_dist(for_length){
            for (i = 0; i <= for_length; i++) {
                spy_segment_id.push( spy_node.eq(i).attr('href') );
                spy_swgmant_dist.push( $(spy_segment_id[i]).offset().top );
            }
        }
        get_id_and_dist(spy_node_num)
        

        //console.log(spy_segment_id, spy_swgmant_dist);
        $(spy_node).click(function(event) {
            var spy_seg = this.hash; // .attr('href')
            var spy_seg_dist = $( spy_seg ).offset().top - $('.header--main').height();
            //因為 header 被 fixed 在頂端
            $('html, body').stop().animate({scrollTop: spy_seg_dist}, '500', 'swing', function() {
                window.location.hash = spy_seg; // 讓 a標籤 換頁效果失效
            });
        });
        $(window).scroll(function(){
            var scroll_position = $('body').scrollTop() + $('.header--main').height() +1; 
            //現在滑動位置
            //因為 header 被 fixed 在頂端 & 確保 nav a 一定會加 active
            function node_status(n) {
                $( spy_node.eq(n) ).addClass('active').siblings( spy_node ).removeClass('active');
            }
            if(scroll_position > spy_swgmant_dist[0] && scroll_position < spy_swgmant_dist[1] ){
                node_status(0);
            }else if(scroll_position > spy_swgmant_dist[1] && scroll_position < spy_swgmant_dist[2] ){
                node_status(1);
            }else if ( scroll_position > spy_swgmant_dist[2] ){
                node_status(2);
            }else {
                $( spy_node ).removeClass('active');
            }
            //console.log(scroll_position);
            //還要再更簡化
        });
    };
$(function(){
  var wa='https://wa.me/919876543210',mail='kanuconsultancy55@gmail.com';
  $('#year').text(new Date().getFullYear());
  $('#main-nav a').on('click',function(){
    if($('.navbar-toggler').is(':visible')) bootstrap.Collapse.getOrCreateInstance('#main-nav',{toggle:false}).hide();
  });
  $('#contact-form').on('submit',function(e){
    e.preventDefault();
    var f=$(this),b=f.find('[type=submit]'),n=$('.form-note'),d={};
    if(!this.checkValidity()) return this.reportValidity();
    $.each(f.serializeArray(),function(_,i){d[i.name]=i.value});
    d._subject='New website inquiry from '+d.name;
    d._replyto=d.email;
    d._template='table';
    d._captcha='false';
    b.prop('disabled',true).text('Sending…');
    n.text('Sending your inquiry…');
    function fail(){n.html('We couldn’t send that right now. Please email <a href="mailto:'+mail+'">'+mail+'</a> or <a href="'+wa+'" target="_blank" rel="noopener">message us on WhatsApp</a>.')}
    $.ajax({url:'https://formsubmit.co/ajax/'+mail,method:'POST',contentType:'application/json',dataType:'json',data:JSON.stringify(d)})
      .done(function(r){if(r.success===true||r.success==='true'){n.text('Thank you. Your inquiry has been sent.');f[0].reset()}else fail()})
      .fail(fail)
      .always(function(){b.prop('disabled',false).text('Submit')});
  });
});

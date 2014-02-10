/*
 * Hanging Punctuation
 * This function takes a DOM element,
 * searches each of its direct descendants,
 * and, if the element begins with hangable punctuation,
 * the appropriate HTML class is applied to the element.
 *
 * Then the parent DOM element get's a class to activate
 * the child classes we applied. 
 */
function hangPunctuation(container) {

    // Punctuation marks that qualify to be hung
    var marks = {
        '\u201c': 'medium',     // “ - ldquo - left smart double quote
        '\u2018': 'small',      // ‘ - lsquo - left smart single quote
        '\u0022': 'medium',     // " - ldquo - left dumb double quote
        '\u0027': 'small',      // ' - lsquo - left dumb single quote
        '\u00AB': 'large',      // « - laquo - left double angle quote
        '\u2039': 'medium',     // ‹ - lsaquo - left single angle quote
        '\u201E': 'medium',     // „ - bdquo - left smart double low quote
        '\u201A': 'small',      // ‚ - sbquo - left smart single low quote
    };
        
    // Loop over all direct descendants of the container
    // If it's a blockquote, loop over its direct descendants
    for(i=0; i<container.children.length; i++) {

        var el = container.children[i];

        if (el.tagName === 'BLOCKQUOTE') {
            for (var k = 0; k < el.children.length; k++) {
                hangIfEligible(el.children[k]);
            };
        }
        else {
            hangIfEligible(el);
        }
    }

    // Check to see if the passed-in element 
    // begins with one of the qualifying punctuation types
    // If it does, apply the appropriate class depending on the tag type
    function hangIfEligible(el) {
        var text = el.innerText || el.textContent;
        var htmlClass = 'indent-';

        for(var mark in marks) {
            if ( text.indexOf(mark) === 0 ){
                el.classList.add(htmlClass + marks[mark]);
            }
        }
    }
}

window.onload = function() {
    var container = document.querySelector('.post')
    hangPunctuation( container );
    //container.classList.add('hang-punctuation');
    changeHang.click();
}



/*
 * Code specific to tutorial
 * Button click events:
 *      Hang/Don't Hang toggle
 *      Toggle Border
 */
var changeBorder = document.getElementById('change-border'),
    changeHang = document.getElementById('change-hang'),
    post = document.querySelector('.post');


changeBorder.onclick = function(){
    post.classList.toggle('post-border');
};

changeHang.onclick = function(){
    if (post.classList.contains('hang-punctuation')) {
        this.innerText = "Hang";
        this.textContent = "Hang";
        post.classList.remove('hang-punctuation');
    } else {
        this.innerText = "Don’t Hang";
        this.textContent = "Don’t Hang";
        post.classList.add('hang-punctuation');
    }
};
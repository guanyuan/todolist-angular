Array.createMatrix = function(m,n,initial) {
	var a, i, j, mat = [];
	for (i=0; i<m; i++) {
		a = [];
		for (j=0; j<n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
}
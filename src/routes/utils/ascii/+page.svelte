<script lang="ts">
	const items = [
		{ char: 'NUL', description: 'Null' },
		{ char: 'SOH', description: 'Start of Header' },
		{ char: 'STX', description: 'Start of Text' },
		{ char: 'ETX', description: 'End of Text' },
		{ char: 'EOT', description: 'End of Transmission' },
		{ char: 'ENQ', description: 'Enquiry' },
		{ char: 'ACK', description: 'Acknowledge' },
		{ char: 'BEL', description: 'Bell' },
		{ char: 'BS', description: 'Backspace' },
		{ char: 'HT', description: 'Horizontal Tab' },
		{ char: 'LF', description: 'Line Feed' },
		{ char: 'VT', description: 'Vertical Tab' },
		{ char: 'FF', description: 'Form Feed' },
		{ char: 'CR', description: 'Carriage Return' },
		{ char: 'SO', description: 'Shift Out' },
		{ char: 'SI', description: 'Shift In' },
		{ char: 'DLE', description: 'Data Link Escape' },
		{ char: 'DC1', description: 'Device Control 1' },
		{ char: 'DC2', description: 'Device Control 2' },
		{ char: 'DC3', description: 'Device Control 3' },
		{ char: 'DC4', description: 'Device Control 4' },
		{ char: 'NAK', description: 'Negative Acknowledge' },
		{ char: 'SYN', description: 'Synchronize' },
		{ char: 'ETB', description: 'End of Transmission Block' },
		{ char: 'CAN', description: 'Cancel' },
		{ char: 'EM', description: 'End of Medium' },
		{ char: 'SUB', description: 'Substitute' },
		{ char: 'ESC', description: 'Escape' },
		{ char: 'FS', description: 'File Separator' },
		{ char: 'GS', description: 'Group Separator' },
		{ char: 'RS', description: 'Record Separator' },
		{ char: 'US', description: 'Unit Separator' },
		{ char: 'space', description: 'Space' },
		{ char: '!', description: 'Exclamation mark' },
		{ char: '"', description: 'Double quote' },
		{ char: '#', description: 'Number' },
		{ char: '$', description: 'Dollar sign' },
		{ char: '%', description: 'Percent' },
		{ char: '&', description: 'Ampersand' },
		{ char: "'", description: 'Single quote' },
		{ char: '(', description: 'Left parenthesis' },
		{ char: ')', description: 'Right parenthesis' },
		{ char: '*', description: 'Asterisk' },
		{ char: '+', description: 'Plus' },
		{ char: ',', description: 'Comma' },
		{ char: '-', description: 'Minus' },
		{ char: '.', description: 'Period' },
		{ char: '/', description: 'Slash' },
		{ char: '0', description: 'Zero' },
		{ char: '1', description: 'One' },
		{ char: '2', description: 'Two' },
		{ char: '3', description: 'Three' },
		{ char: '4', description: 'Four' },
		{ char: '5', description: 'Five' },
		{ char: '6', description: 'Six' },
		{ char: '7', description: 'Seven' },
		{ char: '8', description: 'Eight' },
		{ char: '9', description: 'Nine' },
		{ char: ':', description: 'Colon' },
		{ char: ';', description: 'Semicolon' },
		{ char: '<', description: 'Less  than' },
		{ char: '=', description: 'Equality sign' },
		{ char: '>', description: 'Greater than' },
		{ char: '?', description: 'Question mark' },
		{ char: '@', description: 'At sign' },
		{ char: 'A', description: 'Capital A' },
		{ char: 'B', description: 'Capital B' },
		{ char: 'C', description: 'Capital C' },
		{ char: 'D', description: 'Capital D' },
		{ char: 'E', description: 'Capital E' },
		{ char: 'F', description: 'Capital F' },
		{ char: 'G', description: 'Capital G' },
		{ char: 'H', description: 'Capital H' },
		{ char: 'I', description: 'Capital I' },
		{ char: 'J', description: 'Capital J' },
		{ char: 'K', description: 'Capital K' },
		{ char: 'L', description: 'Capital L' },
		{ char: 'M', description: 'Capital M' },
		{ char: 'N', description: 'Capital N' },
		{ char: 'O', description: 'Capital O' },
		{ char: 'P', description: 'Capital P' },
		{ char: 'Q', description: 'Capital Q' },
		{ char: 'R', description: 'Capital R' },
		{ char: 'S', description: 'Capital S' },
		{ char: 'T', description: 'Capital T' },
		{ char: 'U', description: 'Capital U' },
		{ char: 'V', description: 'Capital V' },
		{ char: 'W', description: 'Capital W' },
		{ char: 'X', description: 'Capital X' },
		{ char: 'Y', description: 'Capital Y' },
		{ char: 'Z', description: 'Capital Z' },
		{ char: '[', description: 'Left square bracket' },
		{ char: '\\', description: 'Backslash' },
		{ char: ']', description: 'Right square bracket' },
		{ char: '^', description: 'Caret / circumflex' },
		{ char: '_', description: 'Underscore' },
		{ char: '`', description: 'Grave / accent' },
		{ char: 'a', description: 'Small a' },
		{ char: 'b', description: 'Small b' },
		{ char: 'c', description: 'Small c' },
		{ char: 'd', description: 'Small d' },
		{ char: 'e', description: 'Small e' },
		{ char: 'f', description: 'Small f' },
		{ char: 'g', description: 'Small g' },
		{ char: 'h', description: 'Small h' },
		{ char: 'i', description: 'Small i' },
		{ char: 'j', description: 'Small j' },
		{ char: 'k', description: 'Small k' },
		{ char: 'l', description: 'Small l' },
		{ char: 'm', description: 'Small m' },
		{ char: 'n', description: 'Small n' },
		{ char: 'o', description: 'Small o' },
		{ char: 'p', description: 'Small p' },
		{ char: 'q', description: 'Small q' },
		{ char: 'r', description: 'Small r' },
		{ char: 's', description: 'Small s' },
		{ char: 't', description: 'Small t' },
		{ char: 'u', description: 'Small u' },
		{ char: 'v', description: 'Small v' },
		{ char: 'w', description: 'Small w' },
		{ char: 'x', description: 'Small x' },
		{ char: 'y', description: 'Small y' },
		{ char: 'z', description: 'Small z' },
		{ char: '{', description: 'Left curly bracket' },
		{ char: '|', description: 'Vertical bar' },
		{ char: '}', description: 'Right curly bracket' },
		{ char: '~', description: 'Tilde' },
		{ char: 'DEL', description: 'Delete' }
	];
</script>

<table class="w-fit mx-auto">
	<thead class="sticky top-0">
		<tr class="bg-surface-800">
			<th>Dec</th>
			<th>Hex</th>
			<th>Oct</th>
			<th>Char</th>
			<th>Description</th>
		</tr>
	</thead>

	<tbody>
		{#each items as item, i}
			<tr>
				<td>{i}</td>
				<td>{i.toString(16)}</td>
				<td>{i.toString(8)}</td>
				<td>{item.char}</td>
				<td>{item.description}</td>
			</tr>
		{/each}
	</tbody>
</table>

<table>
            <th>No</th>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>aksi</th>
    <tbody
    @foreach ($users as $row )
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $row->id }}</td>
                <td>{{ $row->name }}</td>
                <td>{{ $row->email }}</td>
                <td>
                    <form action="{{ route('users.destroy', $row->id) }}" method="POST">
                    @csrf
                @method('DELETE')
                <button onclick="return confirm('Apakah Anda yakin ingin menghapus data ini?')" type="submit">Hapus</button>
                </form>
                </td>
            </tr>
            @endforeach
        </tbody>
</table>